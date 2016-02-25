if current_user
  json.username current_user.username
  json.id       current_user.id
else
  nil
end
