# SYNOPSIS

Sometimes you want to review a BASE64 encoded burp traffic log. This reads the
XML from stdin and decodes/outputs to stdout.

# USAGE

```
$ npm install -g burp-parse
$ burp-parse < burpRecording | less
```

## sample burp

A burp XML log might look something like:

```xml
<?xml version="1.0"?>
<!DOCTYPE items [
<!ELEMENT items (item*)>
<!ATTLIST items burpVersion CDATA "">
<!ATTLIST items exportTime CDATA "">
<!ELEMENT item (time, url, host, port, protocol, method, path, extension, request, status, responselength, mimetype, response, comment)>
<!ELEMENT time (#PCDATA)>
<!ELEMENT url (#PCDATA)>
<!ELEMENT host (#PCDATA)>
<!ATTLIST host ip CDATA "">
<!ELEMENT port (#PCDATA)>
<!ELEMENT protocol (#PCDATA)>
<!ELEMENT method (#PCDATA)>
<!ELEMENT path (#PCDATA)>
<!ELEMENT extension (#PCDATA)>
<!ELEMENT request (#PCDATA)>
<!ATTLIST request base64 (true|false) "false">
<!ELEMENT status (#PCDATA)>
<!ELEMENT responselength (#PCDATA)>
<!ELEMENT mimetype (#PCDATA)>
<!ELEMENT response (#PCDATA)>
<!ATTLIST response base64 (true|false) "false">
<!ELEMENT comment (#PCDATA)>
]>
<items burpVersion="1.6.14" exportTime="Mon Apr 13 18:04:58 EDT 2015">
  <item>
    <time>Mon Apr 13 18:03:10 EDT 2015</time>
    <url><![CDATA[http://www.google-analytics.com/collect?v=1&_v=j34&a=1908689507&t=pageview&_s=1&dl=http%3A%2F%2Fbeautifulgranite.com%2F&ul=en-us&de=UTF-8&dt=Untitled%20Document&sd=32-bit&sr=720x1280&vp=980x1402&je=0&_utma=63499196.178485963.1414159547.1428962577.1428962577.1&_utmz=63499196.1428962577.1.1.utmcsr%3D(direct)%7Cutmccn%3D(direct)%7Cutmcmd%3D(none)&_utmht=1428962591519&_u=AACCAAQAI~&jid=&cid=178485963.1414159547&tid=UA-856047-1&z=658582538]]></url>
    <host ip="63.88.73.148">www.google-analytics.com</host>
    <port>80</port>
    <protocol>http</protocol>
    <method>GET</method>
    <path><![CDATA[/collect?v=1&_v=j34&a=1908689507&t=pageview&_s=1&dl=http%3A%2F%2Fbeautifulgranite.com%2F&ul=en-us&de=UTF-8&dt=Untitled%20Document&sd=32-bit&sr=720x1280&vp=980x1402&je=0&_utma=63499196.178485963.1414159547.1428962577.1428962577.1&_utmz=63499196.1428962577.1.1.utmcsr%3D(direct)%7Cutmccn%3D(direct)%7Cutmcmd%3D(none)&_utmht=1428962591519&_u=AACCAAQAI~&jid=&cid=178485963.1414159547&tid=UA-856047-1&z=658582538]]></path>
...
```

## sample output
The output of this tool will look something like:

```
± burp-parse < log | head
method: GET
url: http://www.google-analytics.com/collect?v=1&_v=j34&a=1908689507&t=pageview&_s=1&dl=http%3A%2F%2Fbeautifulgranite.com%2F&ul=en-us&de=UTF-8&dt=Untitled%20Document&sd=32-bit&sr=720x1280&vp=980x1402&je=0&_utma=63499196.178485963.1414159547.1428962577.1428962577.1&_utmz=63499196.1428962577.1.1.utmcsr%3D(direct)%7Cutmccn%3D(direct)%7Cutmcmd%3D(none)&_utmht=1428962591519&_u=AACCAAQAI~&jid=&cid=178485963.1414159547&tid=UA-856047-1&z=658582538
host: www.google-analytics.com
request:
GET /collect?v=1&_v=j34&a=1908689507&t=pageview&_s=1&dl=http%3A%2F%2Fbeautifulgranite.com%2F&ul=en-us&de=UTF-8&dt=Untitled%20Document&sd=32-bit&sr=720x1280&vp=980x1402&je=0&_utma=63499196.178485963.1414159547.1428962577.1428962577.1&_utmz=63499196.1428962577.1.1.utmcsr%3D(direct)%7Cutmccn%3D(direct)%7Cutmcmd%3D(none)&_utmht=1428962591519&_u=AACCAAQAI~&jid=&cid=178485963.1414159547&tid=UA-856047-1&z=658582538 HTTP/1.1
Host: www.google-analytics.com
Proxy-Connection: keep-alive
Referer: http://beautifulgranite.com/
X-Requested-With: com.android.browser
User-Agent: Mozilla/5.0 (Linux; U; Android 4.2.2; en-us; x86-Nexus7 Build/JDQ39E) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30

```
