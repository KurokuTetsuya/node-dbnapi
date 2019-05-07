## Modules

<dl>
<dt><a href="#module_Request">Request</a></dt>
<dd><p>Request module, contains shorthand for doing request using node-fetch.</p></dd>
<dt><a href="#module_BotClass">BotClass</a></dt>
<dd><p>User resolved module, contains getter and setter for interface {IBot}.</p></dd>
<dt><a href="#module_Main">Main</a></dt>
<dd><p>Main module, the source of Discord Bots Nation API workflow.
Contains classes that wraps function to access DBN REST API.</p></dd>
<dt><a href="#module_UserClass">UserClass</a></dt>
<dd><p>User resolved module, contains getter and setter for interface {IUser}.</p></dd>
</dl>

<a name="module_Request"></a>

## Request
<p>Request module, contains shorthand for doing request using node-fetch.</p>

**Implements**: <code>RequestClass</code>  
**Author**: Riichi_Rusdiana#6815  

* [Request](#module_Request)
    * [~Request](#module_Request..Request)
        * [new Request(url, headers)](#new_module_Request..Request_new)

<a name="module_Request..Request"></a>

### Request~Request
**Kind**: inner class of [<code>Request</code>](#module_Request)  
<a name="new_module_Request..Request_new"></a>

#### new Request(url, headers)

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | <p>The base URL of REST API, contains the root url for later use.</p> |
| headers | <code>RequestHeaders</code> | <p>The headers that will be sent for each request.</p> |

<a name="module_BotClass"></a>

## BotClass
<p>User resolved module, contains getter and setter for interface {IBot}.</p>

**Implements**: <code>IBot</code>  
**Author**: Riichi_Rusdiana#6815  
<a name="module_Main"></a>

## Main
<p>Main module, the source of Discord Bots Nation API workflow.
Contains classes that wraps function to access DBN REST API.</p>

**Implements**: <code>MainClass</code>  
**Author**: Riichi_Rusdiana#6815  

* [Main](#module_Main)
    * [~Client](#module_Main..Client)
        * [new Client(token, clientid, ownerid)](#new_module_Main..Client_new)
        * [.fetchUser(clientID)](#module_Main..Client+fetchUser) ⇒ <code>Promise.&lt;any&gt;</code>

<a name="module_Main..Client"></a>

### Main~Client
**Kind**: inner class of [<code>Main</code>](#module_Main)  

* [~Client](#module_Main..Client)
    * [new Client(token, clientid, ownerid)](#new_module_Main..Client_new)
    * [.fetchUser(clientID)](#module_Main..Client+fetchUser) ⇒ <code>Promise.&lt;any&gt;</code>

<a name="new_module_Main..Client_new"></a>

#### new Client(token, clientid, ownerid)

| Param | Type | Description |
| --- | --- | --- |
| token | <code>string</code> | <p>The authentication token of your DBN profile.</p> |
| clientid | <code>string</code> | <p>The valid registered Discord Client Application ID.</p> |
| ownerid | <code>string</code> | <p>The valid registered Owner ID.</p> |

<a name="module_Main..Client+fetchUser"></a>

#### client.fetchUser(clientID) ⇒ <code>Promise.&lt;any&gt;</code>
<p>Fetch User Information.</p>

**Kind**: instance method of [<code>Client</code>](#module_Main..Client)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| clientID | <code>string</code> | <p>Resolved User Client ID.</p> |

<a name="module_UserClass"></a>

## UserClass
<p>User resolved module, contains getter and setter for interface {IUser}.</p>

**Implements**: <code>IUser</code>  
**Author**: Riichi_Rusdiana#6815  
