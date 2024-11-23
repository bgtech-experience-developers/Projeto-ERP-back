
import bycript from "bcrypt";
export class BycriptCripto {
    static comparePassword(passwordUser, passwordCripto) {
        return bycript.compareSync(passwordUser, passwordCripto);
    }

}
