const checkSession = async () => {
  const response = await fetch("/check");
  const { success, id } = await response.json();
  if (success) {
    $("body").addClass("logged");
    $("#userId").text(id);
  } else {
    $("body").removeClass("logged");
    $("#userId").text("");
  }
};

jQuery(document).ready(($) => {
  checkSession();

  $("#logoutButton").click(async (e) => {
    await fetch(`/logout`);
    await checkSession();
  });

  $("#loginForm").submit(async (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    const password = e.target.password.value;
    let url = `/login?id=${id}&password=${password}`;
    const response = await fetch(url);
    const { success, error } = await response.json();
    if (success) {
      $("#loginForm").trigger("reset");
      await checkSession();
    } else {
      alert(error);
    }
  });
});
