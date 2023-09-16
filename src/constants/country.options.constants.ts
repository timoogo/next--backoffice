export interface CountryOption {
    label: string;
    value: string;
    format: string; // Nouvelle propriété pour le format de numéro

    }


    export const countries: CountryOption[] = [
        { label: 'France (+33)', value: '+33', format: '+33 X XX XX XX XX' },
        { label: 'Belgique (+32)', value: '+32', format: '+32 X XX XX XX XX' },
        { label: 'Suisse (+41)', value: '+41', format: '+41 XX XXX XX XX' },
        { label: 'Luxembourg (+352)', value: '+352', format: '+352 XXX XXX XXX' },
        { label: 'Allemagne (+49)', value: '+49', format: '+49 XXXX XXXXXXX' },
        { label: 'Royaume-Uni (+44)', value: '+44', format: '+44 X XXXX XXXXXX' },
        { label: 'Espagne (+34)', value: '+34', format: '+34 XXX XXX XXX' },
        { label: 'Italie (+39)', value: '+39', format: '+39 XXX XXX XXXX' },
        { label: 'Portugal (+351)', value: '+351', format: '+351 X XXX XXX XXX' },
        { label: 'Pays-Bas (+31)', value: '+31', format: '+31 X XXX XXX XXX' },
        { label: 'Irlande (+353)', value: '+353', format: '+353 X XXX XXXX' },
        { label: 'Autriche (+43)', value: '+43', format: '+43 X XXXX XXXXXX' },
        { label: 'Danemark (+45)', value: '+45', format: '+45 XX XX XX XX' },
        { label: 'Suède (+46)', value: '+46', format: '+46 X XXXX XXXX' },
        { label: 'Finlande (+358)', value: '+358', format: '+358 XX XXXX XXXX' },
        { label: 'Norvège (+47)', value: '+47', format: '+47 XX XX XX XX' },
        { label: 'Pologne (+48)', value: '+48', format: '+48 XXX XXX XXX' },
        { label: 'Grèce (+30)', value: '+30', format: '+30 XXX XXX XXXX' },
        { label: 'République tchèque (+420)', value: '+420', format: '+420 XXX XXX XXX' },
        { label: 'Slovaquie (+421)', value: '+421', format: '+421 XXX XXX XXX' },
        { label: 'Hongrie (+36)', value: '+36', format: '+36 XX XXX XXXX' },
        { label: 'Roumanie (+40)', value: '+40', format: '+40 XXX XXX XXX' },
        { label: 'Russie (+7)', value: '+7', format: '+7 XXX XXX XX XX' },
        { label: 'Ukraine (+380)', value: '+380', format: '+380 XX XXX XXXX' },
        { label: 'Turquie (+90)', value: '+90', format: '+90 XXX XXX XXXX' },
        { label: 'Islande (+354)', value: '+354', format: '+354 XXX XXXX' },
      ];