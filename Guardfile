# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'markdown', :convert_on_start => true, :dry_run => false do  
  watch (/html\/(.+\/)*(.+\.)(md|markdown)/i) { |m| "html/#{m[1]}#{m[2]}#{m[3]}|www/#{m[1]}#{m[2]}html"}
end

haml_options = { format: :html5, attr_wrapper: '"', ugly: false } 
guard "haml", input: "html", output: "www", haml_options: haml_options  do
  watch %r{^haml/.+\.haml}     
end

guard 'coffeescript', :input => 'coffee', :output => 'www/javascripts'

