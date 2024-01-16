import Link from "next/link";
import Layout from "./component/Layout";

export default function Home() {
  return (
    <>
      <h1>Map Index Page</h1>
      <ul>
        <li>
          <Link href={"/stores"}>맛집 목록</Link>
        </li>
        <li>
          <Link href={"/stores/new"}>맛집 생성</Link>
        </li>
        <li>
          <Link href={"/stores/1"}>맛집 상세페이지 </Link>
        </li>
        <li>
          <Link href={"/stores/1"}>맛집 상세페이지 수정</Link>
        </li>
        <li>
          <Link href={"/users/login"}>로그인</Link>
        </li>
        <li>
          <Link href={"/users/mypage"}>마이페이지</Link>
        </li>
        <li>
          <Link href={"/users/mypage"}>찜한 맛집</Link>
        </li>
      </ul>
    </>
  );
}
