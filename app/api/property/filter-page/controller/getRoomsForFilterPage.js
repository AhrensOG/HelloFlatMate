import {
  Room,
  Property,
  RentalItem,
  RentalPeriod,
  LeaseOrderRoom,
} from "@/db/init";
import { Op } from "sequelize";
import { NextResponse } from "next/server";

function parseQueryArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

function parseRentalPeriodString(periodStr) {
  const regex = /Del (\d{2})\/(\d{2})\/(\d{4}) al (\d{2})\/(\d{2})\/(\d{4})/;
  const match = periodStr?.match(regex);
  if (!match) return null;

  const [, d1, m1, y1, d2, m2, y2] = match;

  const start = new Date(`${y1}-${m1}-${d1}`);
  const end = new Date(`${y2}-${m2}-${d2}`);

  return { start, end };
}

export async function getRoomsForFilterPage(query) {
  try {
    const {
      minPrice,
      maxPrice,
      startDate,
      endDate,
      bathroom,
      couple,
      category,
      typology,
      zone,
      rentalPeriod,
      order,
    } = query;

    const categoryArray = parseQueryArray(category);
    const typologyArray = parseQueryArray(typology);
    const zoneArray = parseQueryArray(zone);
    let orderBy = undefined;

    if (order === "price_desc") {
      orderBy = [["price", "DESC"]];
    } else if (order === "price_asc") {
      orderBy = [["price", "ASC"]];
    }

    const roomFilters = {
      isActive: true,
      ...(minPrice || maxPrice
        ? {
            price: {
              ...(minPrice && { [Op.gte]: Number(minPrice) }),
              ...(maxPrice && { [Op.lte]: Number(maxPrice) }),
            },
          }
        : {}),
      ...(bathroom === "true" && { bathroom: true }),
      ...(couple === "true" && { couple: true }),
    };

    const propertyFilters = {
      isActive: true,
      status: { [Op.ne]: "DELETED" },
      ...(zoneArray.length > 0 && {
        zone: {
          [Op.or]: zoneArray.map((z) => ({
            [Op.iLike]: `%${z}%`,
          })),
        },
      }),
      ...(categoryArray.length > 0 && {
        category: {
          [Op.in]: categoryArray,
        },
      }),
      ...(typologyArray.length > 0 && {
        typology: {
          [Op.in]: typologyArray.filter((t) =>
            ["MIXED", "ONLY_WOMEN", "ONLY_MEN"].includes(t)
          ),
        },
      }),
    };

    const rentalPeriodFilters = rentalPeriod
      ? (() => {
          const parsed = parseRentalPeriodString(rentalPeriod);
          console.log("PARSEADO:", parsed);
          if (!parsed) return undefined;

          return {
            startDate: parsed.start,
            endDate: parsed.end,
          };
        })()
      : undefined;

    const rooms = await Room.findAll({
      where: roomFilters,
      include: [
        {
          model: Property,
          as: "property",
          where: propertyFilters,
          attributes: [
            "id",
            "typology",
            "zone",
            "category",
            "street",
            "streetNumber",
          ],
        },
        {
          model: RentalItem,
          as: "rentalItems",
          required: true,
          attributes: ["id"],
          include: {
            model: RentalPeriod,
            as: "rentalPeriod",
            where: rentalPeriodFilters,
            required: !!rentalPeriodFilters,
            attributes: ["startDate", "endDate"],
          },
        },
      ],
      order: orderBy,
      attributes: [
        "id",
        "name",
        "price",
        "images",
        "isActive",
        "bathroom",
        "couple",
        "typology",
      ],
    });

    const cleanedRooms = rooms.map((room) => {
      const plain = room.toJSON();

      return {
        id: plain.id,
        name: plain.name,
        price: plain.price,
        images: [plain.images?.[0]] ?? null,
        bathroom: plain.bathroom,
        couple: plain.couple,
        typology: plain.typology,
        property: {
          id: plain.property?.id,
          typology: plain.property?.typology,
          zone: plain.property?.zone,
          category: plain.property?.category,
          street: plain.property?.street,
          streetNumber: plain.property?.streetNumber,
        },
      };
    });

    return NextResponse.json(cleanedRooms, { status: 200 });
  } catch (error) {
    console.error("Error al obtener habitaciones filtradas:", error);
    return NextResponse.json(
      { error: "Error al obtener habitaciones filtradas" },
      { status: 500 }
    );
  }
}
