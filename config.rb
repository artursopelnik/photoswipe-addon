require 'bundler/setup'

# change this when finished developing to anything else than "development" (e.g. "production")
environment      = :development

disable_warnings = ( environment == :development ) ? false : true
line_comments    = ( environment == :development ) ? true : false
output_style     = ( environment == :development ) ? :expanded : :compressed
relative_assets  = true
http_path        = "/"
css_dir          = "dist/css"
sass_dir         = "src/scss"
images_dir       = "dist/pics"
javascripts_dir  = "dist/js"

# append options to sass --watch when developing
# if environment == :development
#     sass_options = { :debug_info => true }
# end