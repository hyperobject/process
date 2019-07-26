import React from 'react'
import * as style from "./style.module.css";

export default class Header extends React.Component {
    public render() {
        return (
            <header className={style.header}>
                <h1>Process</h1>
                <nav>
                    {/* <Link activeClassName={style.active} href="/">
                        Home
                    </Link>
                    <Link activeClassName={style.active} href="/project/new">
                        New
                    </Link> */}
                </nav>
            </header>
        );
    }
}
