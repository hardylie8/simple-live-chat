class User < ApplicationRecord
    has_many :sender_messages, class_name: 'Message', foreign_key: 'sender_id' , :dependent => :delete_all 
    has_many :receiver_messages, class_name: 'Message', foreign_key: 'receiver_id',  :dependent => :delete_all 

end
