Meteor.startup(function () {
  // Insert sample data if the organization collection is empty
  if (Organization.find().count() === 0) {
    JSON.parse(Assets.getText("organization.json")).organization.forEach(function (doc) {
      Organization.insert(doc);
    });
  }
  // Insert sample data if the events collection is empty
  if (Events.find().count() === 0) {
    JSON.parse(Assets.getText("events.json")).events.forEach(function (doc) {
      Events.insert(doc);
    });
  }
});
