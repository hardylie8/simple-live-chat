class Message < ApplicationRecord
    after_create_commit {broadcastMessage}
    belongs_to :sender, :class_name => 'User'
    belongs_to :receiver, :class_name => 'User'

    private 
    def broadcastMessage
        
        ActionCable.server.broadcast("MessagesChannel",{
        id:,    
        payload:,
        sender_id:,
        receiver_id:,
        })
    end
end
