export function addLeaseOrderToPayments(userGroups, leaseOrders) {
  const { clients, ...rest } = userGroups;

  if (!clients) return userGroups;

  return {
    ...rest,
    clients: clients.map((client) => {
      if (!client.rentPayments && !client.supplies) return client;

      const updatePayments = (payments) => {
        return payments.map((payment) => {
          const leaseOrder = leaseOrders.find(
            (order) => order.id === payment.leaseOrderId
          );
          return leaseOrder
            ? {
                ...payment,
                leaseOrderInfo: {
                  startDate: leaseOrder.startDate,
                  endDate: leaseOrder.endDate,
                  room: leaseOrder.room,
                },
              }
            : payment;
        });
      };

      return {
        ...client,
        rentPayments: client.rentPayments
          ? updatePayments(client.rentPayments)
          : [],
        supplies: client.supplies ? updatePayments(client.supplies) : [],
      };
    }),
  };
}
