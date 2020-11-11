// sales order listing payload
export const body = {
  data: {
    _domain: "self.template = false and self.statusSelect > 2",
    _domainContext: {
      status: "3",
      _id: null,
      _internalUser: 1,
      _myActiveTeam: {
        code: "GRL",
        id: 4,
        name: "General",
      },
      _template: false,
    },
  },
  fields: [
    "amountInvoiced",
    "clientPartner.fullName",
    "company",
    "currency.symbol",
    "deliveryState",
    "exTaxTotal",
    "externalReference",
    "inTaxTotal",
    "orderBeingEdited",
    "orderDate",
    "saleOrderSeq",
    "statusSelect",
    "stockLocation",
    "tradingName",
  ],
  limit: 40,
  offset: 0,
  sortBy: ["-orderDate"]
};
