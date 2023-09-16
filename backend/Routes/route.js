const { insertContact,getContact,getContactId,updateContact,deleteContact,searchContact } = require("../Controller/contactController");

const router = require("express").Router();

router.post("/api/contacts",insertContact)
router.get("/api/contacts",getContact)
router.get("/api/contacts/:id",getContactId);
router.put("/api/contacts/:id",updateContact);
router.delete("/api/contacts/:id",deleteContact);
router.get("/api/search-contacts/:name",searchContact);

module.exports = router;