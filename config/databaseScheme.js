module.exports.users = {
  name: String,
  last_name: String,
  email: String,
  password: String,
  created_at: Date,
  updated_at: Date,
  deleted_date: Date
}

module.exports.albums = {
	id_user: String,
	name: String,
	description: String,
	created_at: Date,
	updated_at: Date
}