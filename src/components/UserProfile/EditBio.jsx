export default function EditBioComponent({
  editingBio,
  newBio,
  githubBio,
  handleEditBio,
  handleCancelEditBio,
  handleSaveBio,
  handleBioChange,
  classes,
}) {
  return (
    <>
      {editingBio ? (
        <>
          <textarea
            value={newBio}
            onChange={handleBioChange}
            className={classes.bio_textarea}
          />
          <div className={classes.edit_button}>
            <button onClick={handleSaveBio}>Save</button>
            <button onClick={handleCancelEditBio}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <p>{githubBio}</p>
          <div className={classes.edit_button}>
            <button onClick={handleEditBio}>Edit Bio</button>
          </div>
        </>
      )}
    </>
  );
}
