export function messageService(messageRepository) {
    return {
        getAll: () => {
            return messageRepository.getAll();
        },
        addMessage: (message) => {
            const messages = messageRepository.getAll().filter(m => m.id === message.id)
             if (!messages.length) {
                messageRepository.addMessage(message);
                return true;
             }

             return false;
        },
        delete: (id) => {
            messageRepository.deleteMessage(id);
        }
    }
}