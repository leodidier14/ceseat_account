# API Account
> 
manages the accounts for the Ceseat application: creation, modification, recovery and deletion (17 routes)
**port : 3002**

### POST /user
> Register user

#### In :
**autorization** :  /
**body (JSON)** : 
{
    "firstName" : "Johnny",
    "lastName" : "Depp",
    "phoneNumber" : "0654276891",
    "email" : "johnny.depp@viacesi.fr",
    "password" : "johnnydepp",
    "confirmedPassword" : "johnnydepp"
}
**params** : /
#### Out
**exit** : STRING **"Registered"**

------------

### PUT /user/:id
> Modify user

#### In :
**autorization** :  BEARER **accesstoken**
**body (JSON)** : 
{
    "firstName" : "Johnny",
    "lastName" : "Depp",
    "phoneNumber" : "0654276891",
    "email" : "johnny.depp@viacesi.fr",
    "password" : "johnnydepp",
    "confirmedPassword" : "johnnydepp",
    "address" : "24 rue des pirates",
    "zipCode" : "13696",
    "country" : "Angleterre",
    "city" : "Londre"
}
**params** : INT **id**
#### Out
**exit** : STRING **"Modified"**

------------

### GET /user/:id
> Get user infos

#### In :
**autorization** :  BEARER **accesstoken**
**body (JSON)** : /
**params** : INT **id**
#### Out
**exit** : 
{
    "firstName" : "Johnny",
    "lastName" : "Depp",
    "phoneNumber" : "0654276891",
    "email" : "johnny.depp@viacesi.fr",
    "address" : "24 rue des pirates",
    "zipCode" : "13696",
    "country" : "Angleterre",
    "city" : "Londre"
}

------------

### DELETE /user/:id
> Delete user

#### In :
**autorization** :  BEARER **accesstoken**
**body (JSON)** : /
**params** : INT **id**
#### Out
**exit** : STRING **"Deleted"**

------------

### POST /dev
> Register dev

#### In :
**autorization** :  /
**body (JSON)** : 
{
    "companyName" : "CESI",
    "email" : "johnny.depp@viacesi.fr",
    "password" : "johnnydepp",
    "confirmedPassword" : "johnnydepp"
}
**params** : /
#### Out
**exit** : STRING **"Registered"**

------------

### PUT /dev/:id
> Modify dev

#### In :
**autorization** :  BEARER **accesstoken**
**body (JSON)** : 
{
    "companyName" : "CESI",
    "email" : "johnny.depp@viacesi.fr",
    "password" : "johnnydepp",
    "confirmedPassword" : "johnnydepp"
}
**params** : INT **id**
#### Out
**exit** : STRING **"Modified"**

------------

### GET /dev/:id
> Get dev infos

#### In :
**autorization** :  BEARER **accesstoken**
**body (JSON)** : /
**params** : INT **id**
#### Out
**exit** : 
{
    "companyName" : "CESI",
    "email" : "johnny.depp@viacesi.fr"
}

------------

### DELETE /dev/:id
> Delete dev

#### In :
**autorization** :  BEARER **accesstoken**
**body (JSON)** : /
**params** : INT **id**
#### Out
**exit** : STRING **"Deleted"**

------------

### POST /restaurant
> Register restaurant

#### In :
**autorization** :  BEARER **accesstoken**
**body (JSON)** : 
{
    "siret" : "64564674674674674",
    "name" : "Chez Michel",
    "email" : "chezmichel@wanadoo.fr",
    "phone" : "0101010101"
}
**params** : /
#### Out
**exit** : STRING **"Registered"**

------------

### PUT /restaurant/:id
> Modify restaurant

#### In :
**autorization** :  BEARER **accesstoken**
**body (JSON)** : 
{
    "siret" : "66666666666666",
    "name" : "Clarinette",
    "email" : "clarinette@wanadoo.fr",
    "phone" : "6767676767",
    "description" : "les bons plats",
    "openingtime" : "10h",
    "closingtime" : "18h",
    "picturelink" : "https://linkpicture.com/",
    "type" : "pizza",
    "address" : "33 rue des crèpes",
    "country" : "France",
    "city" : "mulhouse",
    "postcode" : "66677"
}
**params** : INT **id**
#### Out
**exit** : STRING **"Modified"**

------------

### GET /restaurant/:id
> Get restaurant infos

#### In :
**autorization** :  BEARER **accesstoken**
**body (JSON)** : /
**params** : INT **id**
#### Out
**exit** : 
{
    "siret" : "66666666666666",
    "name" : "Clarinette",
    "email" : "clarinette@wanadoo.fr",
    "phone" : "6767676767",
    "description" : "les bons plats",
    "openingtime" : "10h",
    "closingtime" : "18h",
    "picturelink" : "https://linkpicture.com/",
    "type" : "pizza",
    "address" : "33 rue des crèpes",
    "country" : "France",
    "city" : "mulhouse",
    "postcode" : "66677"
}

------------

### DELETE /restaurant/:id
> Delete restaurant

#### In :
**autorization** :  BEARER **accesstoken**
**body (JSON)** : /
**params** : INT **id**
#### Out
**exit** : STRING **"Deleted"**

------------

### POST /deliveryman
> Register deliveryman

#### In :
**autorization** :  BEARER **accesstoken**
**body (JSON)** : 
{
    "siret" : "66666666666666",
    "sponsorshipLink" : "aeiuzfgpiuazefg",
}
**params** : /
#### Out
**exit** : STRING **"Registered"**

------------

### PUT /deliveryman/:id
> Modify deliveryman

#### In :
**autorization** :  BEARER **accesstoken**
**body (JSON)** : 
{
    "siret" : "66666666666666",
}
**params** : INT **id**
#### Out
**exit** : STRING **"Modified"**

------------

### GET /deliveryman/:id
> Get deliveryman infos

#### In :
**autorization** :  BEARER **accesstoken**
**body (JSON)** : /
**params** : INT **id**
#### Out
**exit** : 
{
    "siret" : "66666666666666",
    "sponsorshipLink" : "aeiuzfgpiuazefg",
}

------------

### DELETE /deliveryman/:id
> Delete deliveryman

#### In :
**autorization** :  BEARER **accesstoken**
**body (JSON)** : /
**params** : INT **id**
#### Out
**exit** : STRING **"Deleted"**

------------

### GET /getrole/:id
> Get user role

#### In :
**autorization** :  BEARER **accesstoken**
**body (JSON)** : /
**params** : INT **id**
#### Out
**exit** : 
{
   "type": "restaurant",
   "id": "23"
}

------------
