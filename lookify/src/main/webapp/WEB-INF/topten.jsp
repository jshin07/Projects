<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Lookify!</title>
</head>
<body>
<h3>Top Ten Songs</h3>
<a href="/dashboard">Dashboard</a><br><br>

	<table border="1">
		<tr>
			<th>Rating</th>
			<th>Name</th>
			<th>Artist</th>	
		</tr>
		
		<c:forEach items="${songs}" var="song" varStatus="loop">
		<tr>
			<td><c:out value= "${song.rating}"/></td>
			<td><a href= "/songs/${song.id}">  <c:out value= "${song.name}"/> </a></td>
			<td><c:out value= "${song.artist}"/></td>
			
		</tr>		
		</c:forEach>
	
	</table>


</body>
</html>