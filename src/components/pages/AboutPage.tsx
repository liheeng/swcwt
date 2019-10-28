import * as React from "react";
import { Card } from "antd";

class AboutPage extends React.Component<{}, {}> {
    public render(): JSX.Element {
        return (
            <Card bordered title="About" style={{ margin: "16px 16px"}}>
                <p>A demo shows layout of standard web canvas widget tookit. </p>
                <p>For details, please see &nbsp;
                    <a href="https://github.com/liheeng/swcwt">
                        https://github.com/liheeng/swcwt
                    </a>
                </p>
            </Card>
        );
    }
}

export default AboutPage;
