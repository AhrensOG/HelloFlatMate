"use client";

import React, { useMemo, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { XMarkIcon } from "@heroicons/react/24/outline";

const validationSchema = Yup.object().shape({
    type: Yup.string().required("Tipo requerido"),
    chatId: Yup.string().required("Chat requerido"),
    participantId: Yup.string().required("Usuario requerido"),
});

const ROLE_LABEL = {
    OWNER: "Propietario",
    CLIENT: "Cliente",
};

export default function AddParticipantModal({
    onClose,
    onSubmit,
    chats = [],
    users = [],
}) {
    const [chatType, setChatType] = useState("");
    const [chatSearch, setChatSearch] = useState("");
    const [userSearch, setUserSearch] = useState("");
    const [showChatDropdown, setShowChatDropdown] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);

    const filteredChats = useMemo(() => {
        return chats
            .filter((chat) => chat.type === chatType)
            .filter((chat) => {
                const serial =
                    chat.type === "GROUP"
                        ? chat.property?.serial?.toLowerCase() || ""
                        : chat.room?.serial?.toLowerCase() || "";
                return serial.includes(chatSearch.toLowerCase());
            });
    }, [chats, chatType, chatSearch]);

    const filteredUsers = useMemo(() => {
        return ["clients", "owners"].flatMap(
            (group) =>
                users[group]?.filter((user) => {
                    const fullName =
                        `${user.name} ${user.lastName}`.toLowerCase();
                    return fullName.includes(userSearch.toLowerCase());
                }) || []
        );
    }, [users, userSearch]);

    const getChatLabel = (chat) => {
        const serial =
            chat.type === "GROUP" ? chat.property?.serial : chat.room?.serial;
        return `${serial || "Sin serial"} - ${chat.type} - ID: ${chat.id}`;
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-6 relative">
                <button className="absolute top-4 right-4" onClick={onClose}>
                    <XMarkIcon className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                </button>

                <h2 className="text-xl font-semibold mb-4 text-center">
                    Añadir Participante a Chat
                </h2>

                <Formik
                    initialValues={{
                        type: "",
                        chatId: "",
                        participantId: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        const selectedUser = filteredUsers.find(
                            (u) => u.id === values.participantId
                        );

                        const payload = {
                            ...values,
                            participantType: selectedUser?.role || null,
                        };

                        onSubmit(payload);
                        setSubmitting(false);
                        onClose();
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        setFieldValue,
                    }) => (
                        <Form className="space-y-5">
                            {/* Chat Type */}
                            <div>
                                <label className="block mb-1 font-medium">
                                    Tipo de Chat
                                </label>
                                <Field
                                    as="select"
                                    name="type"
                                    className="w-full border rounded px-3 py-2"
                                    onChange={(e) => {
                                        const selectedType = e.target.value;
                                        setFieldValue("type", selectedType);
                                        setChatType(selectedType);
                                        setFieldValue("chatId", ""); // Reset chat selection
                                    }}
                                >
                                    <option value="">Seleccionar</option>
                                    <option value="GROUP">Grupal</option>
                                    <option value="PRIVATE">Privado</option>
                                </Field>
                                {touched.type && errors.type && (
                                    <div className="text-red-500 text-sm">
                                        {errors.type}
                                    </div>
                                )}
                            </div>

                            {/* Chat Selector */}
                            <div className="relative">
                                <label className="block mb-1 font-medium">
                                    Seleccionar Chat
                                </label>
                                <div
                                    className="border rounded px-3 py-2 cursor-pointer"
                                    onClick={() =>
                                        setShowChatDropdown((prev) => !prev)
                                    }
                                >
                                    {filteredChats.find(
                                        (chat) => chat.id === values.chatId
                                    )
                                        ? getChatLabel(
                                              filteredChats.find(
                                                  (chat) =>
                                                      chat.id === values.chatId
                                              )
                                          )
                                        : "Seleccionar chat"}
                                </div>

                                {showChatDropdown && (
                                    <div className="absolute z-10 bg-white border mt-1 w-full rounded shadow">
                                        <input
                                            type="text"
                                            placeholder="Buscar por serial..."
                                            className="w-full px-3 py-2 border-b"
                                            value={chatSearch}
                                            onChange={(e) =>
                                                setChatSearch(e.target.value)
                                            }
                                        />
                                        <div className="max-h-52 overflow-y-auto">
                                            {filteredChats.length > 0 ? (
                                                filteredChats.map((chat) => (
                                                    <div
                                                        key={chat.id}
                                                        onClick={() => {
                                                            setFieldValue(
                                                                "chatId",
                                                                chat.id
                                                            );
                                                            setShowChatDropdown(
                                                                false
                                                            );
                                                        }}
                                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                                    >
                                                        {getChatLabel(chat)}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="px-3 py-2 text-sm text-gray-500">
                                                    No hay resultados
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {touched.chatId && errors.chatId && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.chatId}
                                    </div>
                                )}
                            </div>

                            {/* Usuario Selector */}
                            <div className="relative">
                                <label className="block mb-1 font-medium">
                                    Seleccionar Usuario
                                </label>
                                <div
                                    className="border rounded px-3 py-2 cursor-pointer"
                                    onClick={() =>
                                        setShowUserDropdown((prev) => !prev)
                                    }
                                >
                                    {filteredUsers.find(
                                        (u) => u.id === values.participantId
                                    )
                                        ? `${
                                              filteredUsers.find(
                                                  (u) =>
                                                      u.id ===
                                                      values.participantId
                                              ).name
                                          } ${
                                              filteredUsers.find(
                                                  (u) =>
                                                      u.id ===
                                                      values.participantId
                                              ).lastName
                                          } (${
                                              ROLE_LABEL[
                                                  filteredUsers.find(
                                                      (u) =>
                                                          u.id ===
                                                          values.participantId
                                                  ).role
                                              ] || "Desconocido"
                                          })`
                                        : "Seleccionar usuario"}
                                </div>

                                {showUserDropdown && (
                                    <div className="absolute z-10 bg-white border mt-1 w-full rounded shadow">
                                        <input
                                            type="text"
                                            placeholder="Buscar usuario..."
                                            className="w-full px-3 py-2 border-b"
                                            value={userSearch}
                                            onChange={(e) =>
                                                setUserSearch(e.target.value)
                                            }
                                        />
                                        <div className="max-h-52 overflow-y-auto">
                                            {filteredUsers.length > 0 ? (
                                                filteredUsers.map((user) => {
                                                    const fullName =
                                                        `${user.name} ${user.lastName}`.trim();
                                                    return (
                                                        <div
                                                            key={user.id}
                                                            onClick={() => {
                                                                setFieldValue(
                                                                    "participantId",
                                                                    user.id
                                                                );
                                                                setShowUserDropdown(
                                                                    false
                                                                );
                                                            }}
                                                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                                        >
                                                            {fullName} (
                                                            {ROLE_LABEL[user.role]})
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                <div className="px-3 py-2 text-sm text-gray-500">
                                                    No hay resultados
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {touched.participantId &&
                                    errors.participantId && (
                                        <div className="text-red-500 text-sm mt-1">
                                            {errors.participantId}
                                        </div>
                                    )}
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                >
                                    Añadir
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
