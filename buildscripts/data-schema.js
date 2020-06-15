export const schema = {
	type: 'object',
	properties: {
		users: {
			type: 'array',
			minItems: 3,
			maxItems: 10,
			items: {
				type: 'object',
				properties: {
					id: {
						$ref: '#/definitions/positiveInt',
					},
					firstName: {
						type: 'string',
						faker: 'name.firstName',
					},
					lastName: {
						type: 'string',
						faker: 'name.lastName',
					},
					email: {
						type: 'string',
						format: 'email',
						faker: 'internet.email',
					},
				},
				required: ['id', 'firstName', 'lastName', 'email'],
			},
		},
	},
	required: ['users'],
	definitions: {
		positiveInt: {
			type: 'integer',
			minimum: 0,
			exclusiveMinimum: true,
		},
	},
};
