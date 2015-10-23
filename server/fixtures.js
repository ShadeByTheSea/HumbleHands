if ( Meteor.users.find().count() === 0 ) {
    Accounts.createUser({
        username: 'organizer1',
        email: 'shade.mslt@gmail.com',
        password: 'test',
        profile: {
            first_name: 'Jane',
            last_name: 'Doe',
            company: 'Chesapeake Care, Inc.',
        }
    });
}

if ( Meteor.users.find().count() === 1 ) {
    Accounts.createUser({
        username: 'organizer2',
        email: 'kennethecrim@gmail.com',
        password: 'test',
        profile: {
            first_name: 'John',
            last_name: 'Doe',
            company: 'Alzheimer\'s Association',
        }
    });
}

if ( Meteor.users.find().count() === 2 ) {
    Accounts.createUser({
        username: 'volunteer',
        email: 'wilshawn416@verizon.net',
        password: 'test',
        profile: {
            first_name: 'Jane',
            last_name: 'Doe',
            company: 'Dominion Enterprises',
        }
    });
}
