# データベース設計
## User
|column|type  |
|:-----|:-----|
|name  |string|

### アソシエーション
has\_many :messages

has\_and\_belongs\_to\_many :groups

## Group
|column|type  |
|:-----|:-----|
|name  |string|

### アソシエーション
has\_many :massages

has\_and\_belongs\_to\_many :users

## Group\_Users
|column   |type      |
|:--------|:---------|
|user\_id |references|
|group\_id|references|

### Massage
|column   |type      |
|:--------|:---------|
|body     |text      |
|image    |string    |
|user\_id |references|
|group\_id|references|

### アソシエーション
belongs\_to :user

belongs\_to :group




