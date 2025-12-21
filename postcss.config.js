import postcssNested from 'postcss-nested';
import postcssPresetEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';
import pxtorem from 'postcss-pxtorem';
import cssnano from 'cssnano';

export default {
    onWarn(warning) {
        // если файл из node_modules — пропускаем
        if (warning.node?.source?.input?.file?.includes('node_modules')) {
            return;
        }
        // всё остальное — выводим в консоль
        console.warn(warning.toString());
    },
    plugins: [
        postcssNested(),
        postcssPresetEnv({
            stage: 2,
            features: {
                'custom-properties': true,
                //'color-mod-function': { unresolved: 'warn' },
                'nesting-rules': true,
            },
        }),
        pxtorem({
            rootValue: 16,          // 1rem = 16px
            unitPrecision: 5,
            propList: ['*'],
            selectorBlackList: ['.no-rem'],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0,
            // exclude: /node_modules/i,
        }),
        autoprefixer(),
        cssnano({
            preset: 'default'
        }),
    ],
};