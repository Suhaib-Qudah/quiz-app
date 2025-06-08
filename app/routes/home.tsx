import type {Route} from "./+types/home";
import Header from "~/components/Header";
import Container from "~/components/Container";
import {Quiz} from "~/components/Quiz";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "New React Router App"},
        {name: "description", content: "Welcome to React Router!"},
    ];
}

export default function Home() {
    return (
        <Container className={'mt-6'}>
            <Header/>
            <Quiz/>
        </Container>
    )
}
