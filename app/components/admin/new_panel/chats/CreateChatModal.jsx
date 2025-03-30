"use client";

import React, { useState, useMemo } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { XMarkIcon } from "@heroicons/react/24/outline";

const validationSchema = Yup.object().shape({
    type: Yup.string().required("Tipo de chat requerido"),
    relatedId: Yup.string().required("Propiedad o Room requerido"),
    relatedType: Yup.string().required(),
    ownerId: Yup.string().required("Propietario requerido"),
});

export default function CreateChatModal({
    properties = [],
    users = [],
    onClose,
    onSubmit,
}) {
    const [propertyRoomSearch, setPropertyRoomSearch] = useState("");
    const [ownerSearch, setOwnerSearch] = useState("");
    const [showPropertyDropdown, setShowPropertyDropdown] = useState(false);
    const [showOwnerDropdown, setShowOwnerDropdown] = useState(false);

    const combinedOptions = useMemo(() => {
        return properties.flatMap((property) => {
            const propertyOption = {
                id: property.id,
                serial: property.serial,
                type: "PROPERTY",
            };

            const roomOptions =
                property.rooms?.map((room) => ({
                    id: room.id,
                    serial: room.serial,
                    type: "ROOM",
                })) || [];

            return [propertyOption, ...roomOptions];
        });
    }, [properties]);

    const ownerOptions = useMemo(() => {
        return users.owners || [];
    }, [users]);

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-6 relative">
                <button className="absolute top-4 right-4" onClick={onClose}>
                    <XMarkIcon className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                </button>

                <h2 className="text-xl font-semibold mb-4 text-center">
                    Crear Nuevo Chat
                </h2>

                <Formik
                    initialValues={{
                        type: "",
                        relatedId: "",
                        relatedType: "",
                        ownerId: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        onSubmit(values);
                        setSubmitting(false);
                        onClose();
                    }}
                >
                    {({ values, errors, touched, setFieldValue }) => {
                        const filteredCombinedOptions = combinedOptions
                            .filter((item) => {
                                if (values.type === "GROUP")
                                    return item.type === "PROPERTY";
                                if (values.type === "PRIVATE")
                                    return item.type === "ROOM";
                                return false;
                            })
                            .filter((item) =>
                                item.serial
                                    .toLowerCase()
                                    .includes(propertyRoomSearch.toLowerCase())
                            );

                        const filteredOwners = ownerOptions.filter((user) => {
                            const fullName =
                                `${user.name} ${user.lastName}`.toLowerCase();
                            return fullName.includes(ownerSearch.toLowerCase());
                        });

                        return (
                            <Form className="space-y-5">
                                {/* Tipo de Chat */}
                                <div>
                                    <label className="block mb-1 font-medium">
                                        Tipo de Chat
                                    </label>
                                    <select
                                        name="type"
                                        className="w-full border rounded px-3 py-2"
                                        value={values.type}
                                        onChange={(e) => {
                                            setFieldValue(
                                                "type",
                                                e.target.value
                                            );
                                            setFieldValue("relatedId", "");
                                            setFieldValue("relatedType", "");
                                        }}
                                    >
                                        <option value="">Seleccionar</option>
                                        <option value="GROUP">Grupal</option>
                                        <option value="PRIVATE">Privado</option>
                                    </select>
                                    {touched.type && errors.type && (
                                        <div className="text-red-500 text-sm">
                                            {errors.type}
                                        </div>
                                    )}
                                </div>

                                {/* Propiedad / Room */}
                                <div className="relative">
                                    <label className="block mb-1 font-medium">
                                        Propiedad / Room
                                    </label>
                                    <div
                                        className="border rounded px-3 py-2 cursor-pointer"
                                        onClick={() =>
                                            setShowPropertyDropdown(
                                                (prev) => !prev
                                            )
                                        }
                                    >
                                        {values.relatedId
                                            ? `${
                                                  combinedOptions.find(
                                                      (opt) =>
                                                          opt.id ===
                                                              values.relatedId &&
                                                          opt.type ===
                                                              values.relatedType
                                                  )?.serial
                                              } (${values.relatedType})`
                                            : "Seleccionar..."}
                                    </div>

                                    {showPropertyDropdown && (
                                        <div className="absolute z-10 bg-white border mt-1 w-full rounded shadow">
                                            <input
                                                type="text"
                                                placeholder="Buscar por serial..."
                                                className="w-full px-3 py-2 border-b"
                                                value={propertyRoomSearch}
                                                onChange={(e) =>
                                                    setPropertyRoomSearch(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <div className="max-h-52 overflow-y-auto">
                                                {filteredCombinedOptions.map(
                                                    (item) => (
                                                        <div
                                                            key={`${item.type}-${item.id}`}
                                                            onClick={() => {
                                                                setFieldValue(
                                                                    "relatedId",
                                                                    item.id
                                                                );
                                                                setFieldValue(
                                                                    "relatedType",
                                                                    item.type
                                                                );
                                                                setShowPropertyDropdown(
                                                                    false
                                                                );
                                                            }}
                                                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                                        >
                                                            {item.serial} (
                                                            {item.type})
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    {touched.relatedId && errors.relatedId && (
                                        <div className="text-red-500 text-sm mt-1">
                                            {errors.relatedId}
                                        </div>
                                    )}
                                </div>

                                {/* Usuario OWNER */}
                                <div className="relative">
                                    <label className="block mb-1 font-medium">
                                        Seleccionar Propietario
                                    </label>
                                    <div
                                        className="border rounded px-3 py-2 cursor-pointer"
                                        onClick={() =>
                                            setShowOwnerDropdown(
                                                (prev) => !prev
                                            )
                                        }
                                    >
                                        {values.ownerId
                                            ? `${
                                                  ownerOptions.find(
                                                      (u) =>
                                                          u.id ===
                                                          values.ownerId
                                                  )?.name || ""
                                              } ${
                                                  ownerOptions.find(
                                                      (u) =>
                                                          u.id ===
                                                          values.ownerId
                                                  )?.lastName || ""
                                              }`
                                            : "Seleccionar usuario"}
                                    </div>

                                    {showOwnerDropdown && (
                                        <div className="absolute z-10 bg-white border mt-1 w-full rounded shadow">
                                            <input
                                                type="text"
                                                placeholder="Buscar propietario..."
                                                className="w-full px-3 py-2 border-b"
                                                value={ownerSearch}
                                                onChange={(e) =>
                                                    setOwnerSearch(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <div className="max-h-52 overflow-y-auto">
                                                {filteredOwners.length > 0 ? (
                                                    filteredOwners.map(
                                                        (user) => {
                                                            const fullName = `${user.name} ${user.lastName}`;
                                                            return (
                                                                <div
                                                                    key={
                                                                        user.id
                                                                    }
                                                                    onClick={() => {
                                                                        setFieldValue(
                                                                            "ownerId",
                                                                            user.id
                                                                        );
                                                                        setShowOwnerDropdown(
                                                                            false
                                                                        );
                                                                    }}
                                                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                                                >
                                                                    {fullName}
                                                                </div>
                                                            );
                                                        }
                                                    )
                                                ) : (
                                                    <div className="px-3 py-2 text-sm text-gray-500">
                                                        No hay resultados
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    {touched.ownerId && errors.ownerId && (
                                        <div className="text-red-500 text-sm mt-1">
                                            {errors.ownerId}
                                        </div>
                                    )}
                                </div>

                                {/* Botón de envío */}
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                    >
                                        Crear Chat
                                    </button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
}
