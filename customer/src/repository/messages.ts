var messages = [];

export function getAll() {
    return messages;
}

export function addMessage(message) {
    messages.push(message);
}

export function deleteMessage(id) {
    messages = messages.filter(item => item.id !== id)
}