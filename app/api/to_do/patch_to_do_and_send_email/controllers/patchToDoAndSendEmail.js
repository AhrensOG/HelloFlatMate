import { sendMailFunction } from "@/app/api/sendGrid/controller/sendMailFunction";
import { Client, LeaseOrderRoom, Owner, Property, Room, ToDo } from "@/db/init";
import { NextResponse } from "next/server";
import { Op } from "sequelize";
import {
  cancelToDoTemplate,
  completeToDoTemplate,
  reprogramToDoTemplate,
  startToDoTemplate,
} from "./emailTemplates/templates";

export async function patchToDoAndSendEmail(data) {
  if (!data || !data.id || data.id <= 0) {
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }

  try {
    const transaction = await ToDo.sequelize.transaction();
    try {
      const todo = await ToDo.findByPk(data.id);
      if (!todo) {
        await transaction.rollback();
        return NextResponse.json(
          { message: "To do not found" },
          { status: 404 }
        );
      }

      // Actualización de campos
      todo.status = data.status || todo.status;
      todo.comment = data.comment || todo.comment;
      todo.cancellationReason = data.cancellationReason || null;
      todo.amount =
        data.amount === undefined || data.amount === null
          ? todo.amount
          : data.amount;
      todo.startDate = data.startDate || todo.startDate;
      todo.reprogrammed = data.reprogrammed || todo.reprogrammed;
      todo.reprogrammedStartDate =
        data.reprogrammedStartDate || todo.reprogrammedStartDate;
      todo.reprogramingComment =
        data.reprogramingComment || todo.reprogramingComment;
      todo.responsibility = data.responsibility || todo.responsibility;
      todo.closingComments = data.closingComments || todo.closingComments;

      if (data.status === "COMPLETED") {
        todo.endDate = new Date();
      }

      // Envío de email
      const actionType = data.actionType;
      await sendToDoNotification({ type: actionType, todo });

      await todo.save();
      await transaction.commit();

      return NextResponse.json(
        { message: "To do updated successfully" },
        { status: 200 }
      );
    } catch (err) {
      await transaction.rollback();
      return NextResponse.json(
        { message: err.message || err },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }
}

async function sendToDoNotification({ type, todo }) {
  const property = await Property.findByPk(todo.propertyId, {
    attributes: ["id", "serial"],
    include: [
      {
        model: Room,
        as: "rooms",
        attributes: ["id"],
      },
      {
        model: Owner,
        as: "owner",
        attributes: ["email"],
      },
    ],
  });
  todo.propertySerial = property.serial;
  const roomIds = property.rooms.map((r) => r.id);

  const activeTenants = await Client.findAll({
    attributes: ["email"],
    include: [
      {
        model: LeaseOrderRoom,
        as: "leaseOrdersRoom",
        attributes: ["id", "roomId", "startDate", "endDate"],
        where: {
          roomId: { [Op.in]: roomIds },
          startDate: { [Op.lte]: new Date() },
          endDate: { [Op.gte]: new Date() },
        },
      },
    ],
  });

  const shouldNotifyOwner = ["START", "COMPLETE", "CANCEL"].includes(type);
  const recipients = [
    ...(shouldNotifyOwner && property.owner?.email
      ? [property.owner.email]
      : []),
    ...activeTenants.map((t) => t.email),
  ].filter(Boolean);

  const subjectByType = {
    START: `🛠 Nuevo servicio de mantenimiento programado`,
    REPROGRAM: `🔁 Servicio de mantenimiento reprogramado`,
    CANCEL: `❌ Servicio de mantenimiento cancelado`,
    COMPLETE: `✅ Servicio de mantenimiento finalizado`,
  };

  const htmlBodyByType = {
    START: startToDoTemplate(todo),
    REPROGRAM: reprogramToDoTemplate(todo),
    CANCEL: cancelToDoTemplate(todo),
    COMPLETE: completeToDoTemplate(todo),
  };

  // for (const email of recipients) {
  //   await sendMailFunction({
  //     to: email,
  //     subject:
  //       subjectByType[type] || "Notificación de servicio de mantenimiento",
  //     html: htmlBodyByType[type] || "Servicio de mantenimiento generado.",
  //   });
  // }

  // await sendMailFunction({
  //   to: "ahrensgabriel09@gmail.com",
  //   subject: subjectByType[type] || "Notificación de servicio de mantenimiento",
  //   html: htmlBodyByType[type] || "Servicio de mantenimiento generado.",
  // });
}
