if current_user
  json.username current_user.username
  json.id       current_user.id
  json.demo     @demo
else
  nil
end
