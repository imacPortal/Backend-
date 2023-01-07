# API DOC #

## API PORT FOR DEV USE: 5000 ##

## User API ##
## <b>/auth/signup</b> ##
Use to add new user.<br><br>
<b>Type:-</b> Post<br/>

<table>
<tr>
<th>
PARAMS
</th>
<th>
VALUE
</th>
<th>
REQUIRED
</th>
</tr>
<tr>
<th>
<b>name:</b>
<td>   
 String<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<th>
<b>regno:</b> 
</th>
<td>   
String<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<th>
<b>email:</b>
</th>
<td>   
 String<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<th>
<b>password:</b>
</th>
<td>   
 String<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<th>
<b>designation:</b>
</th>
<td>   
 String<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<th>
<b>phno:</b>
</th>
<td>   
number
</td>
<td>
true
</td>
</tr>
<tr>
<th>
<b>dept:</b>
</th>
<td>   
string
</td>
<td>
true
</td>
</tr>
<table>

<br/>
<br/>
<br/>

## <b>/auth/setup</b> ##
Use to add more details of new user.<br><br>
<b>Type:-</b> Post<br/>

<table>
<tr>
<th>
PARAMS
</th>
<th>
VALUE
</th>
<th>
REQUIRED
</th>
</tr>
<tr>
<th>
<b>name:</b>
<td>   
 String<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<th>
<b>registrationnumber:</b> 
</th>
<td>   
String<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<th>
<b>email:</b>
</th>
<td>   
 String<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<tr>
<th>
<b>phoneNumber:</b>
</th>
<td>   
 number<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<th>
<b>department:</b>
</th>
<td>   
string
</td>
<td>
true
</td>
</tr>
<table>

<br/>
<br/>
<br/>

## <b>/auth/getUser/:id</b> ##
Use to get user.<br><br>
<b>Type:-</b> GET<br/>

<br/>
<br/>
<br/>


## <b>/auth/login</b> ##
Use to login user.<br><br>
<b>Type:-</b> Post<br/>

<table>
<tr>
<th>
PARAMS
</th>
<th>
VALUE
</th>
<th>
REQUIRED
</th>
</tr>
<tr>
<th>
<b>email:</b>
<td>   
 String<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<th>
<b>password:</b> 
</th>
<td>   
String<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<table>

<br/>
<br/>
<br/>


## <b>/auth/resetPassword</b> ##
Use to reset Password of user.<br><br>
<b>Type:-</b> Post<br/>

<table>
<tr>
<th>
PARAMS
</th>
<th>
VALUE
</th>
<th>
REQUIRED
</th>
</tr>
<tr>
<th>
<b>email:</b>
<td>   
 String<br/> 
</td>
<td>
true
</td>
</tr>
<table>

<br/>
<br/>
<br/>

## <b>/auth/changePassword/:id</b> ##
Use to change Password user.<br><br>
<b>Type:-</b> Post<br/>

<table>
<tr>
<th>
PARAMS
</th>
<th>
VALUE
</th>
<th>
REQUIRED
</th>
</tr>
<tr>
<th>
<b>newPassword:</b>
<td>   
 String<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<th>
<b>email:</b>
<td>   
 String<br/> 
</td>
<td>
true
</td>
</tr>
<table>

<br/>
<br/>
<br/>


## System API ##
<br/>

## <b>/system/add</b> ##

Use to add new system.<br><br>
<b>Type:-</b> Post<br/>

<table>
<tr>
<th>
PARAMS
</th>
<th>
VALUE
</th>
<th>
REQUIRED
</th>
</tr>
<tr>
<th>
<b>ram:</b>
<td>   
 number<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<th>
<b>storage:</b> 
</th>
<td>   
String<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<tr>
<th>
<b>processor:</b> 
</th>
<td>   
String<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<tr>
<th>
<b>serialNo:</b> 
</th>
<td>   
String<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<tr>
<th>
<b>labNo:</b> 
</th>
<td>   
number<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<tr>
<th>
<b>systemNo:</b> 
</th>
<td>   
number<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<table>

<br/>
<br/>
<br/>

## <b>/system/labFetch</b> ##

Use to fetch lab details using lab No.<br><br>
<b>Type:-</b> Post<br/>

<table>
<tr>
<th>
PARAMS
</th>
<th>
VALUE
</th>
<th>
REQUIRED
</th>
</tr>
<th>
<b>labNo:</b>
<td>   
 number<br/> 
</td>
<td>
true
</td>
</tr>
<table>

<br/>
<br/>
<br/>


## Booking Request API ##
<br/>

## <b>/bookingreq/add</b> ##

Use to fetch lab details using lab No.<br><br>
<b>Type:-</b> Post<br/>

<table>
<tr>
<th>
PARAMS
</th>
<th>
VALUE
</th>
<th>
REQUIRED
</th>
</tr>
<tr>
<th>
<b>name:</b>
<td>   
 String<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<th>
<b>reqNo:</b>
<td>   
 String<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<th>
<b>date</b>
<td>   
 String<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<th>
<b>slotes</b>
<td>   
 Number<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<th>
<b>lab</b>
<td>   
 Number<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<th>
<b>noOfStuds</b>
<td>   
 String<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<th>
<b>subject</b>
<td>   
 String<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<th>
<b>reason</b>
<td>   
 String<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<th>
<b>System</b>
<td>   
 [string]<br/> 
</td>
<td>
true
</td>
</tr>
<table>





<br/>
<br/>
<br/>


## <b>/bookingreq/delete/:id</b> ##

Use to delete booking requests using id<br><br>
<b>Type:-</b> Post<br/>

<table>
<tr>
<th>
PARAMS
</th>
<th>
VALUE
</th>
<th>
REQUIRED
</th>
</tr>
<tr>
<th>
<b>name:</b>
<td>   
 String<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<th>
<b>reqNo:</b>
<td>   
 String<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<th>
<b>date</b>
<td>   
 String<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<th>
<b>slotes</b>
<td>   
 Number<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<th>
<b>lab</b>
<td>   
 Number<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<th>
<b>noOfStuds</b>
<td>   
 String<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<th>
<b>subject</b>
<td>   
 String<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<th>
<b>reason</b>
<td>   
 String<br/> 
</td>
<td>
true
</td>
</tr>
<tr>
<th>
<b>System</b>
<td>   
 [string]<br/> 
</td>
<td>
true
</td>
</tr>
<table>

<br>
<br>
<br>

## Report API ##
<br/>

## <b>/report/fetchAll</b> ##

Use to get all the repotr of booking<br><br>
<b>Type:-</b> GET<br/>

<br/>
<br/>
<br/>

## <b>/report/fetchAll/:regNo</b> ##

Use to get a perticular repotr of booking using regNo.<br><br>
<b>Type:-</b> GET<br/>

<br/>
<br/>
<br/>
