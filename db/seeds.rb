# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
  User.create(name: "Luke", age:19, profilePictureLink: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600')
  User.create(name: "Lulu", age:19, profilePictureLink: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600')
  Message.create(payload: "Hi.", sender_id:1, receiver_id:2)
  Message.create(payload: "Hello.", sender_id:2, receiver_id:1)
