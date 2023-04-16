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
