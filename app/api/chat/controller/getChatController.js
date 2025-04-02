import {
  Admin,
  Chat,
  ChatParticipant,
  Client,
  LeaseOrderProperty,
  LeaseOrderRoom,
  Message,
  Owner,
  Property,
  Room,
} from "@/db/init";
import { Sequelize, Op } from "sequelize";
import { NextResponse } from "next/server";

export async function getChats() {
  const chats = await Chat.findAll({
    include: [
      { model: Message, as: "messages" },
      { model: ChatParticipant, as: "participants" },
    ],
  });
  return NextResponse.json({ chats });
}

export async function getChatById(id) {
  if (!id)
    return NextResponse.json({ error: "No id provided" }, { status: 400 });
  try {
    const chat = await Chat.findByPk(id, {
      include: [{ model: ChatParticipant, as: "participants" }],
    });
    if (!chat)
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    return NextResponse.json(chat, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function getChatByUser(userId) {
  if (!userId) {
    return NextResponse.json({ error: "No id provided" }, { status: 400 });
  }

  try {
    // Encuentra todos los chats en los que el usuario está participando
    const chats = await Chat.findAll({
      include: [
        {
          model: ChatParticipant,
          as: "participants",
          include: [
            {
              model: Client,
              as: "client",
              attributes: ["id", "name", "lastName"],
            },
            {
              model: Admin,
              as: "admin",
              attributes: ["id", "name", "lastName"],
            },
            {
              model: Owner,
              as: "owner",
              attributes: ["id", "name", "lastName"],
            },
          ],
        },
        {
          model: Message,
          as: "messages",
        },
      ],
      where: {
        id: {
          [Op.in]: Sequelize.literal(`(
                        SELECT "chatId" FROM "ChatParticipant" WHERE "participantId" = '${userId}'
                    )`),
        },
      },
    });

    // Convertir cada chat a un objeto plano y agregar `relatedModel`
    const chatsWithRelatedModels = await Promise.all(
      chats.map(async (chat) => {
        const chatData = chat.toJSON();

        if (chat.relatedType === "PROPERTY") {
          chatData.relatedModel = await Property.findOne({
            where: { id: chat.relatedId },
            attributes: ["id", "serial", "category"],
          });
        } else if (chat.relatedType === "ROOM") {
          chatData.relatedModel = await Room.findOne({
            where: { id: chat.relatedId },
            include: [
              { model: Property, as: "property", attributes: ["category"] },
            ],
            attributes: ["id", "serial"],
          });
        }

        return chatData;
      })
    );

    return NextResponse.json({ chats: chatsWithRelatedModels });
  } catch (error) {
    console.error("Error fetching chats:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
