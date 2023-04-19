export const isThereErrorOnReqBodyTransaction = (reqBody: any): boolean => {
    const { description, amount, installmentsNumber, typeTransaction } =
        reqBody;
    const allowedTransactionTypes = [
        'fixedexpenses',
        'variableexpenses',
        'income',
    ];
    if (
        !description ||
        String(description).trim().length === 0 ||
        !Number(amount) ||
        !Number(installmentsNumber) ||
        !allowedTransactionTypes.includes(typeTransaction)
    ) {
        return true;
    }
    return false;
};

export const isThereErrorOnReqQueryInstallment = (reqQuery: any): boolean => {
    if (!reqQuery) {
        return true;
    }
    const { month, year } = reqQuery;
    if (!Number(month) || !Number(year) || String(year).length < 4) {
        return true;
    }
    return false;
};
