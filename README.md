# tec_parking
Proyecto 1, Diseño


## ENDPOINTS # deprecated

## USER

#### Post login
```
  Post /api/user/login/
```

returns string token

| Request | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. |
| `password`      | `string` | **Required**. |


#### Post register user
```
  Post /api/user/register/
```

requires token and admin role 

| Request | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. |
| `email`      | `string` | **Required**. |
| `secondEmail`      | `string` | **Required**. |
| `useSecondEmailAsFavorite`      | `bool` | **Required**. |
| `phone`      | `int` | **Required**. |
| `idNumber`      | `string` | **Required**. |
| `area`      | `{code : COM, name : Computación}` | **Required**. |
| `password`      | `string` | **Required**. |
| `role`      | `string` | **Required**. | 

#### Post update
```
  Put /api/user
```

optional token and admin role 

| Request | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `user` | **Optional**. |
| `plates`      | `string[]` | **Optional**. |
| `secondEmail`      | `string` | **Optional**. |
| `schedule`      | `[{ monday: { [startTime: "7:00 am", endTime: "7:00 pm"] } }]` | **Optional**. |
 

## RESERVES

#### Post reserve
```
  Post /api/reserve
```


| Request | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `building`      | `string` | **Required**. |
| `email`      | `string` | **Required**. |
| `schedule`      | `[{ monday: { [startTime: "7:00 am", endTime: "7:00 pm"] } }]` | **Required**. |


## Parkinglots

#### Post create
```
  Post /api/parkinglot
```

| Request | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `building`      | `string` | **Required**. |
| `name`      | `string` | **Required**. |
| `disabledSpaces`      | `int` | **Required**. |
| `vehiclesSpaces`      | `int` | **Required**. |
| `administrativeSpaces`      | `int` | **Required**. |
| `othersSpaces`      | `int` | **Required**. |
| `type`      | `string` | **Required**. |
| `phone`      | `int` | **Optional**. |
| `ownerName`      | `string` | **Optional**. |
| `startContract`      | `date` | **Optional**. |
| `endContract`      | `date` | **Optional**. |


#### Put update
```
  Put /api/parkinglot
```

| Request | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. |
| `delete`      | `boolean` | **Required**. |
| `building`      | `string` | **Required**. |
| `name`      | `string` | **Required**. |
| `disabledSpaces`      | `int` | **Required**. |
| `vehiclesSpaces`      | `int` | **Required**. |
| `administrativeSpaces`      | `int` | **Required**. |
| `othersSpaces`      | `int` | **Required**. |
| `type`      | `string` | **Required**. |
| `phone`      | `int` | **Optional**. |
| `ownerName`      | `string` | **Optional**. |
| `startContract`      | `date` | **Optional**. |
| `endContract`      | `date` | **Optional**. |


## Reports

##### report timeZones
```
    Get /api/report?report=timeZones
```

| Response | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `timesChunks`      | `[{ day: 'monday', start: 7:30, end: 9:30, count: 3 }]` | **Required**. |


##### report parkinglots
```
    Get /api/report?report=parkinglots
```
| Response | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `parkinglots`      | `[ { ... } ]` | **Required**. |


##### report employees
```
  Get /api/report?report=employees

```
| Response | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `names`      | `[ { id: 114212345, name: 'gerald' } ]` | **Required**. |


##### report employee
```
  Get /api/report?report=employee&id=114212345
```
| Response | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. |
| `email`      | `string` | **Required**. |
| `secondEmail`      | `string` | **Required**. |
| `useSecondEmailAsFavorite`      | `boolean` | **Required**. |
| `phone`      | `int` | **Required**. |
| `idNumber`      | `string` | **Required**. |
| `area`      | `string` | **Required**. |
