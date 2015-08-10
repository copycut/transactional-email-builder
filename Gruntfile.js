module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    config: require('config'),

    paths: {
      src:        'src',
      dist:       'dist'
    },

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: [
          {
            expand: true,
            cwd: './src/css/scss',
            src: ['*.scss'],
            dest: './src/css',
            ext: '.css'
          }
        ]
      }
    },

    assemble: {
      templates: {
        options: {
          helpers: '<%= paths.src %>/helpers/*.js',
          flatten: true,
          assets: '<%= paths.dist %>/img',
          layoutdir: '<%= paths.src %>/layouts',
          layout: 'default.hbs',
          data: '<%= paths.src %>/data/*/*.{json,yml}',
          partials: '<%= paths.src %>/partials/*.hbs',
          plugins: ['assemble-contrib-i18n'],
          i18n: {
            languages: [
              "en",
              "es",
              "fr",
              "nl",
              "pt",
              "de"
            ],
            templates: ['<%= paths.src %>/emails/*.hbs']
          }
        },
        dest: '<%= paths.dist %>/',
        src: '!*.*',
      },

      meta: {
        options: {
          ext: '.json',
          flatten: true,
          data: '<%= paths.src %>/data/*/*.{json,yml}',
          plugins: ['assemble-contrib-i18n'],
          i18n: {
            languages: [
              "en",
              "es",
              "fr",
              "nl",
              "pt",
              "de"
            ],
            templates: ['<%= paths.src %>/emails/*.json']
          }
        },
        dest: '<%= paths.dist %>/',
        src: '!*.*',
      }
    },

    premailer: {
      html: {
        options: {
          removeComments: true
        },
        files: [{
            expand: true,
            src: ['<%= paths.dist %>/*.html'],
            dest: ''
        }]
      },
      txt: {
        options: {
          mode: 'txt'
        },
        files: [{
            expand: true,
            src: ['<%= paths.dist %>/*.html'],
            dest: '',
            ext: '.txt'
        }]
      }
    },

    cdn: {
      aws_s3: {
        options: {
          cdn: 'http://<%= config.s3.emails.bucketuri %>/<%= config.s3.emails.bucketdir %>',
          flatten: true,
          supportedTypes: 'html'
        },
        cwd: './<%= paths.dist %>',
        dest: './<%= paths.dist %>',
        src: ['*.html']
      }
    },

    aws_s3: {
      options: {
        accessKeyId: '<%= config.s3.key %>',
        secretAccessKey: '<%= config.s3.secret %>',
        region: '<%= config.s3.region %>',
        uploadConcurrency: 5,
        downloadConcurrency: 5
      },
      emails: {
        options: {
          bucket: '<%= config.s3.emails.bucketname %>',
          differential: true,
          params: {
            CacheControl: '2000'
          }
        },
        files: [
          {
            expand: true,
            cwd: '<%= paths.dist %>',
            src: [
              'img/*',
              'email_templates.zip'
            ],
            dest: '<%= config.s3.emails.bucketdir %>'}
        ]
      },
      translations: {
        options: {
          bucket: '<%= config.s3.translations.bucketname %>',
        },
        files: [
          { cwd: '<%= paths.src %>/data/i18n/', dest: '<%= config.s3.translations.bucketdir %>/en.json', action: 'download' },
          { cwd: '<%= paths.src %>/data/i18n/', dest: '<%= config.s3.translations.bucketdir %>/es.json', action: 'download' },
          { cwd: '<%= paths.src %>/data/i18n/', dest: '<%= config.s3.translations.bucketdir %>/fr.json', action: 'download' },
          { cwd: '<%= paths.src %>/data/i18n/', dest: '<%= config.s3.translations.bucketdir %>/nl.json', action: 'download' },
          { cwd: '<%= paths.src %>/data/i18n/', dest: '<%= config.s3.translations.bucketdir %>/pt.json', action: 'download' },
          { cwd: '<%= paths.src %>/data/i18n/', dest: '<%= config.s3.translations.bucketdir %>/de.json', action: 'download' }
        ]
      }
    },

    zip: {
      email_templates: {
        src: [ '<%= paths.dist %>/*.html', '<%= paths.dist %>/*.txt', '<%= paths.dist %>/*.json' ],
        dest: '<%= paths.dist %>/email_templates.zip'
      }
    }
  });

  require('load-grunt-tasks')(grunt);
  grunt.registerTask('default', ['aws_s3:translations', 'sass', 'assemble', 'premailer']);
  grunt.registerTask('s3upload', ['cdn:aws_s3', 'zip', 'aws_s3:emails']);
  grunt.registerTask('ci', [ 'default', 's3upload' ]);
};
