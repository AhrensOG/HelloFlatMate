import { Contract } from "@/db/init";
import { NextResponse } from "next/server";

export async function getAllContracts() {

    try {
        const contracts = await Contract.findAll();
        return NextResponse.json({ contracts }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Contracts not found" }, { status: 400 })
    }
}

export async function getContractById(id) {
    if (!id) return NextResponse.json({ message: "No id provided" }, { status: 400 })
    try {
        const contract = await Contract.findByPk(id)
        return NextResponse.json({ contract }, { status: 200 })
    } catch (error) { return NextResponse.json({ message: "Contract not found" }, { status: 400 }) }
}

export async function getContractByPropertyId(id) {
    if (!id) return NextResponse.json({ message: "No id provided" }, { status: 400 })
    try {
        const contract = await Contract.findAll({ where: { propertyId: id } })
        return NextResponse.json({ contract }, { status: 200 })
    } catch (error) { return NextResponse.json({ message: "Contract not found" }, { status: 400 }) }
}

export async function getContractByClientId(id) {
    if (!id) return NextResponse.json({ message: "No id provided" }, { status: 400 })
    try {

        const contract = await Contract.findAll({ where: { clientId: id } })
        return NextResponse.json({ contract }, { status: 200 })
    } catch (error) { return NextResponse.json({ message: "Contract not found" }, { status: 400 }) }
}

export async function getContractByOwnerId(id) {
    if (!id) return NextResponse.json({ message: "No id provided" }, { status: 400 })
    try {
        const contract = await Contract.findAll({ where: { ownerId: id } })
        return NextResponse.json({ contract }, { status: 200 })
    } catch (error) { return NextResponse.json({ message: "Contract not found" }, { status: 400 }) }
}