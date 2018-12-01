export function message (error) {
    if (!Array.isArray(error.msg)) {
        return error.msg
    } 
}
export function validationMessage (error, field) {
    let response
    if (Array.isArray(error.msg)) {
        error.msg.forEach((item) => {
            if (item.param === field) response = item.msg
            else response = '' 
        })
    } else response = '' 

    return response
}