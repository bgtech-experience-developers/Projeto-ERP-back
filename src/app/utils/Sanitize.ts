import sanitize from "sanitize-html";

class Sanitize {
    sanitizeTags(input: any) {
        return sanitize(input, {
            allowedTags: [],
            allowedAttributes: {},
        })
    }
}
