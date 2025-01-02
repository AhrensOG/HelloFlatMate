import { Chat } from "@/db/init";
import { NextResponse } from "next/server";

export async function activateChat(chatId) {

    if (!chatId) {
        return NextResponse.json({ error: "No chat id provided" }, { status: 400 });
    }

    let transaction;
    try {
        // Crear la transacción correctamente con await
        transaction = await Chat.sequelize.transaction();

        const chat = await Chat.findByPk(chatId, { transaction });
        if (!chat) {
            await transaction.rollback();
            return NextResponse.json({ error: "Chat not found" }, { status: 404 });
        }

        chat.isActive = true;
        await chat.save({ transaction });
        await transaction.commit();
        return NextResponse.json({ message: "Chat activated" }, { status: 200 });
    } catch (error) {
        await transaction.rollback();
        return NextResponse.json({ error: "Error activating chat" }, { status: 500 });
    }
}

export async function desactivateChat(chatId) {
    if (!chatId) {
        return NextResponse.json({ error: "No chat id provided" }, { status: 400 });
    }

    let transaction;
    try {
        // Crear la transacción correctamente con await
        transaction = await Chat.sequelize.transaction();

        const chat = await Chat.findByPk(chatId, { transaction });
        if (!chat) {
            await transaction.rollback();
            return NextResponse.json({ error: "Chat not found" }, { status: 404 });
        }

        chat.isActive = false;
        chat.ownerId = null;
        await chat.save({ transaction });
        await transaction.commit();
        return NextResponse.json({ message: "Chat deactivated" }, { status: 200 });
    } catch (error) {
        await transaction.rollback();
        return NextResponse.json({ error: "Error deactivating chat" }, { status: 500 });
    }
}

export async function assignSupport(data) {
    if (!data) {
        return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }
    if (!data.suppId || data.suppId.trim() === "") {
        return NextResponse.json({ error: "No supp id provided" }, { status: 400 });
    }
    if (!data.chatId || data.chatId <= 0) {
        return NextResponse.json({ error: "No chat id provided" }, { status: 400 });
    }
    try {
        const transaction = await Chat.sequelize.transaction();
        try {
            const chat = await Chat.findByPk(data.chatId, { transaction });
            if (!chat) {
                await transaction.rollback();
                return NextResponse.json({ error: "Chat not found" }, { status: 404 });
            }
            chat.ownerId = data.suppId;
            await chat.save({ transaction });
            await transaction.commit();
            return NextResponse.json({ message: "Support assigned" }, { status: 200 });
        } catch (error) {
            await transaction.rollback();
            return NextResponse.json({ error: "Error assigning support" }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Error assigning support" }, { status: 500 });
    }
}