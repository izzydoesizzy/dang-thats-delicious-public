const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
	console.log(req.name);
	req.flash('error', 'Successfully Created');
	req.flash('info', 'Successfully Created');
	req.flash('warning', 'Successfully Created');
	req.flash('success', 'Successfully Created');
	res.render('index');  
};

exports.addStore = (req, res) => {
	res.render('editStore', {title: 'Add Store'});
};


exports.createStore = async (req, res) => {
	const store = await (new Store(req.body)).save();
	// await store.save();
	req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`);
	res.redirect(`/store/${store.slug}`);
};

exports.getStores = async (req, res) => {
	// 1. Query the database for a list of all the stores
	const stores = await Store.find();
	res.render('stores', { title: 'Stores', stores});
};


exports.editStore = async (req, res) => {
	//1 Find the store given the ID
	const store = await Store.findOne({ _id: req.params.id });
	
	//2 Confirm they are the owner of the store
	//TODO
	//3 Render the edit form so the user can update the store
	res.render('editStore', { title: `Edit ${store.name}`, store });
	
};


exports.updateStore = async (req, res) => {
	// Find and update (q, data, options)
	const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
		runValidators: true
	}).exec();
	req.flash('success', `Successfully updated ${store.name}.  <a href="/stores/${store.slug}">View Store →</a>`); 
	res.redirect(`/stores/${store._id}/edit`);
};










