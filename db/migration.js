const Category = require("./models/category");
const Property = require("./models/property");
const sequelize = require("./index");
const migration = async () => {
    try {
        const transaction = await sequelize.transaction();

        try {
            // Paso 1: Obtener categorías únicas de las propiedades
            const uniqueCategories = await Property.findAll({
                attributes: [[sequelize.fn("DISTINCT", sequelize.col("categoryEnum")), "categoryName"]],
                raw: true,
            });
            console.log(uniqueCategories);

            // Filtrar categorías nulas
            const filteredCategories = uniqueCategories.filter((category) => category.categoryName !== null);
            console.log(filteredCategories);

            // Verificar si hay categorías únicas
            if (filteredCategories.length === 0) {
                console.log("No se encontraron categorías únicas en las propiedades.");
                return;
            }

            // Paso 2: Crear un mapa de categorías existentes para acceso rápido
            const categories = await Category.findAll({
                where: {
                    name: filteredCategories.map((category) => category.categoryName), // Filtrar por nombres únicos
                },
            });
            console.log(categories.toLocaleString());

            // Crear un mapa de categorías para acceso rápido
            const categoryMap = categories.reduce((acc, category) => {
                acc[category.name] = category.id;
                return acc;
            }, {});

            console.log(categoryMap);

            // Paso 3: Actualizar las propiedades para relacionarlas con las categorías
            const propertyPromises = filteredCategories.map(async (category) => {
                const categoryId = categoryMap[category.categoryName];
                if (!categoryId) {
                    console.error(`No se encontró categoryId para ${category.categoryName}`);
                    return;
                }

                console.log(`Actualizando propiedades donde categoryEnum es ${category.categoryName}`);

                try {
                    await Property.update(
                        { categoryId: categoryId }, // Actualizar la clave foránea
                        { where: { categoryEnum: category.categoryName }, transaction } // Asegúrate de usar 'categoryEnum'
                    );
                } catch (error) {
                    console.error(`Error actualizando propiedades para ${category.categoryName}:`, error);
                }
            });

            await Promise.all(propertyPromises);

            // Paso 4: Confirmar la transacción
            await transaction.commit();
            console.log("Migración completada exitosamente.");
        } catch (error) {
            await transaction.rollback();
            console.error("Error durante la migración:", error);
        }
    } catch (error) {
        console.error("Error al iniciar la migración:", error);
    }
};

module.exports = migration;
