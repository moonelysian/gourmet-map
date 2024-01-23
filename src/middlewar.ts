export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/users/mypage", "/users/like", "/stores/new", "/stores/:id/edit"],
};
