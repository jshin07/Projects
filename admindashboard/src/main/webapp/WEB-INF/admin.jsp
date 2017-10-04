<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Admin Dashboard</title>
</head>
<body>
	<h1>Welcome <c:out value="${currentUser.firstName}"></c:out></h1>
	
	  <form id="logoutForm" method="POST" action="/logout">
        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
        <input type="submit" value="Logout!" />
    </form>	<br>	
    
    <table border="1">
        <th> Name </th>
   		<th> Email </th>
    	<th> Action </th>
    
    <c:forEach items="${allUsers}" var="user" varStatus="loop">

    <tr> 
    	<td><c:out value="${user.firstName} ${user.lastName}"/></td>
    	<td><c:out value="${user.email}"/></td>
    	<c:choose>
    		<c:when test= "${user.isAdmin() }">
    			<td>Admin</td>
    		</c:when>
    		<c:otherwise>
    			<td> <a href="/delete/${user.id}"> Delete</a> | <a href="/makeadmin/${user.id}">Make as Admin</a></td>
    		</c:otherwise>
    	</c:choose>
    </tr>

    
    </c:forEach>
    
    </table>
    
</body>
</html>