<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Lookify!</title>
</head>
<body>
<h3 style="color:red">
	<c:forEach items="${errs}" var ="err">
		<c:out value= "${err.getDefaultMessage()}"/>
	</c:forEach>
</h3>	

<a href="/dashboard">Dashboard</a><br><br>

	<form:form action="/songs/new" method="post" modelAttribute="song">
	
		<form:label path="name"> Title
			<form:input path="name"></form:input>
			<form:errors path="name"></form:errors>
		</form:label> <br>
		<form:label path="artist"> Artist
			<form:input path="artist"></form:input>
			<form:errors path="artist"></form:errors>
		</form:label><br>
		<form:label path="rating"> Rating
			<form:select path="rating">
				<form:option value="1"/>
				<form:option value="2"/>
				<form:option value="3"/>
				<form:option value="4"/>
				<form:option value="5"/>
				<form:option value="6"/>
				<form:option value="7"/>
				<form:option value="8"/>
				<form:option value="9"/>
				<form:option value="10"/>				
			</form:select>
			<form:errors path="rating"></form:errors>
		</form:label><br><br>	

			
		<input type="submit" name="Add Song"></input>			
		
	</form:form>	
	
	
	
	
	
</body>
</html>