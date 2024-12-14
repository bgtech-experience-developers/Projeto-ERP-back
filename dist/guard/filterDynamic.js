export class TypeFilter {
    value;
    constructor(value) {
        this.value = value;
    }
    filterPhone(value = this.value) {
        const regexvaluePhone = /^[0-9]{1,15}$/;
        return regexvaluePhone.test(value);
    }
    filterEmail(value = this.value) {
        const regexValueEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexValueEmail.test(value);
    }
    filterCompany(value = this.value) {
        const companyfilter = /^[A-Za-zÀ-ÿ\s]+$/;
        return companyfilter.test(value);
    }
}
