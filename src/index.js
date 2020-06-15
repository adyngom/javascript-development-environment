import './index.css';
import { getUsers, deleteUser } from './api/user-api';

getUsers().then((result) => {
	let usersBody = '';

	result.forEach((user) => {
		usersBody += `<tr>
            <td><a href="#" data-id="${user.id}" class="delete-user">Delete</a></td>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
        </tr>`;
	});

	window.document.getElementById('users').innerHTML = usersBody;

	const deleteLinks = [...window.document.querySelectorAll('.delete-user')];

	if (deleteLinks.length) {
		deleteLinks.forEach((link) => {
			link.onclick = (event) => {
				const elem = event.target;
				event.preventDefault();
				deleteUser(elem.dataset['id']);
				const row = elem.parentNode.parentNode;
				row.parentNode.removeChild(row);
			};
		});
	}
});
