var PROJECT_NAME = 'toutiao_wap';

//开发发布目录
//var DEPLOY = {
//    receiver: 'http://10.4.17.164:10000/receiver',
//    dev_root: '/data00/home/lujingfeng/repos/ss_site'
//};

fis.config.merge({
    projectname: PROJECT_NAME,
    roadmap: {
        domain: ['http://s0.pstatp.com', 'http://s2.pstatp.com']
    },
    modules : {
        // 自动css sprites插件
        spriter: 'csssprites',
        parser : {
            //utc：underscore自带模板语言
            tmpl: 'utc',
            //less：css方言
            less: 'less',
            scss: 'sass'
        },
        postprocessor : {
            js : 'jswrapper, require-async'
        },
        //postpackager : ""
        //postpackager : ['autoload']
    },
    settings : {
        // optimizer : {
        //     'png-compressor' : {
        //         type : 'pngquant' //default is pngcrush
        //     }
        // },
        postprocessor : {
            jswrapper : {
                type : 'amd'
            }
        },
        postpackager : {
            //用于配合amd规范进行require文件的自动合并
            autoload: {
                //使用静态资源地图，便于支持require.async进行异步组件加载
                useSiteMap: false,
                useInlineMap: false,
                //资源资源地图放置位置
                subpath : 'static/pkg/asyncmap.js',
                //自动加载script依赖的占位标识符
                scriptTag: '<!-- SCIRPT_AUTOLOAD -->',
                //自动加载css依赖的占位标识符
                styleTag: '<!-- STYLE_AUTOLOAD -->',
                //资源表占位标识符
                resourceMapTag: '<!-- MAP_AUTOLOAD -->'
            },
            //用于进行零散文件依据pack配置进行打包替换
            simple: {
                //不开启自动的零散资源合并
                //所有资源严格进行手动整合
                autoCombine: false
            }
        },
        spriter: {
            csssprites: {
                margin: 30
            }
        },
    }
});

fis.config.merge({
    deploy: {
        jinjian : [{
            receiver: 'http://10.4.17.164:19999/receiver',
            //从产出的结果的static目录下找文件
            from : '/resource',
            //保存到远端机器
            to : '/data00/home/jinjian/repos/ss_site/webroot'
        }, {
            receiver: 'http://10.4.17.164:19999/receiver',
            from : '/template',
            //保存到远端机器
            to : '/data00/home/jinjian/repos/ss_site/djangosite/templates',
            replace : {
                from : '{{{path}}}',
                to : 'template/' + PROJECT_NAME
            }
        }],
        lujingfeng : [{
            receiver: 'http://10.4.17.164:10000/receiver',
            //从产出的结果的static目录下找文件
            from : '/resource',
            //保存到远端机器
            to : '/data00/home/lujingfeng/repos/ss_site/webroot'
        }, {
            receiver: 'http://10.4.17.164:10000/receiver',
            from : '/template',
            //保存到远端机器
            to : '/data00/home/lujingfeng/repos/ss_site/djangosite/templates',
            replace : {
                from : '{{{path}}}',
                to : 'template/' + PROJECT_NAME
            }
        }],
        wangcong : [{
            receiver: 'http://10.4.17.164:18994/receiver',
            //从产出的结果的static目录下找文件
            from : '/resource',
            //保存到远端机器
            to : '/data00/home/wangcong/repos/ss_site/webroot'
        }, {
            receiver: 'http://10.4.17.164:18994/receiver',
            //从产出的结果的static目录下找文件
            from : '/template',
            //保存到远端机器
            to : '/data00/home/wangcong/repos/ss_site/djangosite/templates',
            replace : {
                from : '{{{path}}}',
                to : 'template/' + PROJECT_NAME
            }
        }],
        wangwei : [{
            receiver: 'http://10.4.17.164:6666/receiver',
            //从产出的结果的static目录下找文件
            from : '/resource',
            //保存到远端机器
            to : '/data00/home/wangwei/repos/ss_site/webroot'
        }, {
            receiver: 'http://10.4.17.164:6666/receiver',
            from : '/template',
            //保存到远端机器
            to : '/data00/home/wangwei/repos/ss_site/djangosite/templates',
            replace : {
                from : '{{{path}}}',
                to : 'template/' + PROJECT_NAME
            }
        }],
        guanwei : [{
            receiver: 'http://10.4.17.164:6776/receiver',
            //从产出的结果的static目录下找文件
            from : '/resource',
            //保存到远端机器
            to : '/data00/home/guanwei/repos/ss_site/webroot'
        }, {
            receiver: 'http://10.4.17.164:6776/receiver',
            from : '/template',
            //保存到远端机器
            to : '/data00/home/guanwei/repos/ss_site/djangosite/templates',
            replace : {
                from : '{{{path}}}',
                to : 'template/' + PROJECT_NAME
            }
        }],
        miaoweir : [{
            receiver: 'http://10.4.17.164:18998/receiver',
            //从产出的结果的static目录下找文件
            from : '/resource',
            //保存到远端机器
            to : '/data00/home/miaowei/repos/ss_site/webroot'
        }, {
            receiver: 'http://10.4.17.164:18998/receiver',
            from : '/template',
            //保存到远端机器
            to : '/data00/home/miaowei/repos/ss_site/djangosite/templates',
            replace : {
                from : '{{{path}}}',
                to : 'template/' + PROJECT_NAME
            }
        }],
        online: [{
            from : '/resource',
            //保存到远端机器
            to : './output/webroot'
        }, {
            from : '/template',
            //保存到远端机器
            to : './output/djangosite/templates',
            replace : {
                from : '{{{path}}}',
                to : 'template/' + PROJECT_NAME
            }
        }]
    },
    roadmap : {
        ext : {
            //less输出为css文件
            less : 'css',
            scss: 'css'
        }
    }
});
//设置jshint插件要排除检查的文件，默认不检查lib、jquery、backbone、underscore等文件
//使用spmx release命令时，添加--lint或-l参数即可生效
//fis.config.set('settings.lint.jshint.ignored', [ 'lib/**', /jquery|backbone|underscore/i ]);

//打包配置
//fis.config.set('pack', {});
fis.config.set('roadmap.path', [{
        //前端模板
        reg : '**.tmpl',
        //当做类js文件处理，可以识别__inline, __uri等资源定位标识
        isJsLike : true,
        release : false
    }, {
        reg : /(\.inline\.less|readme.txt|build.*)$/,
        release : false
    }, {
        reg : /^\/(pagelet|common|static)\/.*\.(less|css)$/,
        useSprite : true,
        release: '/resource/${projectname}/$&'
    }, {
        reg : /^\/(pagelet|common)\/.*\.js$/,
        isMod : true,
        release: '/resource/${projectname}/$&'
    }, {
        reg : /^\/(pagelet|page|widget)\/(.*)\.html$/,
        release : '/template/${projectname}/$&'
    },{
        reg : /^\/(pagelet|common|static)\/.*\/.*$/,
        release: '/resource/${projectname}/$&'
    }
]);
fis.config.set('pack', {
    '/static/pkg/pack.js': [
        '/static/js/lib/jquery-2.0.0.min.js',
        '/static/js/lib/jquery.touchToClick.js',
        '/static/js/lib/common.js',
        '/static/js/utils/jump2app.js'
    ],
    '/static/pkg/index_pack.js': [
        '/static/js/lib/ads.js',
        '/static/js/lib/canvasUtils.js',
        '/static/js/lib/touchPull.js',
        '/static/js/lib/pull2refresh_v2.js',
        '/static/js/user.js',
        '/static/js/flow.js',
        '/static/js/list_action.js'
    ],
    '/static/pkg/pack1.js': [
        '/static/js/reflow/detail.js',
        '/static/js/reflow/init.js'
    ]
});
