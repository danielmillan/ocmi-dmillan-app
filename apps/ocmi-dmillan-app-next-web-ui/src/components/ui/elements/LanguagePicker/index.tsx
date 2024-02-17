import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'primereact/dropdown';
import Image from 'next/image';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function LanguagePicker({ isMobile = false }) {
    const router = useRouter();
    const { t } = useTranslation();
    const [languages] = useState([
        { name: 'language.options.spanish', code: 'es' },
        { name: 'language.options.english', code: 'en' },
    ]);
    const { i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(router.locale);
    }, [router]);

    const onChangeLanguage = (event: {
        value: { name: string; code: string };
    }) => {
        router.push(router.pathname, '', { locale: event.value.code })
        i18n.changeLanguage(event.value.code);
    };

    const selectedLanguageTemplate = (option: any, props: any) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <Image
                        height={32}
                        width={32}
                        className="mr-3"
                        src={`/images/languages/${option.code}.png`}
                        alt={option.name}
                    />
                    {!isMobile && <div className="text">{t(option.name)}</div>}
                </div>
            );
        }
        return <span>{props.placeholder}</span>;
    };

    const languageOptionTemplate = (option: { name: string; code: string }) => {
        return (
            <div className="flex align-items-center">
                <Image
                    height={32}
                    width={32}
                    className="mr-3"
                    src={`/images/languages/${option.code}.png`}
                    alt={option.name}
                />
                {!isMobile && <div className="text">{t(option.name)}</div>}
            </div>
        );
    };

    if (languages.length === 0) {
        return <ProgressSpinner />;
    } else {
        return (
            <div>
                <label htmlFor="language">{t('labels.language')}</label>
                <Dropdown
                    className="w-full mt-3"
                    value={languages.find(l => l.code === router.locale)}
                    options={languages}
                    onChange={onChangeLanguage}
                    optionLabel="name"
                    placeholder={t('language.place-holder')}
                    valueTemplate={selectedLanguageTemplate}
                    itemTemplate={languageOptionTemplate}
                />
            </div>
        );
    }
}
