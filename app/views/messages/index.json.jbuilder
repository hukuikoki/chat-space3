json.(@messages) do |message|
  json.id message.id
  json.name message.user.name
  json.body message.body
  json.created_at message.created_at.strftime("%Y年%m月%d日 %H:%M:%S")
  json.image message.image.url
end
