import React from 'react';
import SettingsLayout from '@/components/Layouts/SettingsLayout';
    import ChangeUsername from '@/components/Forms/ChangeUsername';
import ChangeEmail from '@/components/Forms/ChangeEmail';

export default function SettingsPage() {
    const getChildTitles = () => {
        let children: React.ReactNode;
        return React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.props.title) {
                return <h1>{child.props.title}</h1>;
            }
            return null;
        });
    };

    return (
        <SettingsLayout titles={getChildTitles()}>
            <div>
                <ChangeUsername title="Change Username" description="Changer son user" />
                <ChangeEmail title="Change Email" description="" />
            </div>
        </SettingsLayout>
    );
}
